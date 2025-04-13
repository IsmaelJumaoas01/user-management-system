import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map, finalize } from "rxjs/operators";
import { environment } from "@environments/environment";
import { Account } from "@app/_models";

const baseUrl = `${environment.apiUrl}/accounts`;

/**
 * Account service for managing user authentication and account operations
 * Handles login, registration, token management, and account CRUD operations
 */
@Injectable({ providedIn: "root" })
export class AccountService {
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(private router: Router, private http: HttpClient) {
    this.accountSubject = new BehaviorSubject<Account>(null);
    this.account = this.accountSubject.asObservable();
  }

  /**
   * Get the current account value
   */
  public get accountValue(): Account {
    return this.accountSubject.value;
  }

  /**
   * Authenticate user with email and password
   * @param email User's email address
   * @param password User's password
   * @returns Observable of the authenticated account
   */
  login(email: string, password: string) {
    return this.http
      .post<any>(
        `${baseUrl}/authenticate`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        map((account) => {
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  /**
   * Logout current user and revoke refresh token
   */
  logout() {
    this.http
      .post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true })
      .subscribe();
    this.stopRefreshTokenTimer();
    this.accountSubject.next(null);
    this.router.navigate(["/account/login"]);
  }

  /**
   * Refresh the JWT token using the refresh token
   * @returns Observable of the refreshed account
   */
  refreshToken() {
    return this.http
      .post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        map((account) => {
          this.accountSubject.next(account);
          this.startRefreshTokenTimer();
          return account;
        })
      );
  }

  /**
   * Register a new user account
   * @param account The account details to register
   * @returns Observable of the registration response
   */
  register(account: Account) {
    return this.http.post(`${baseUrl}/register`, account);
  }

  /**
   * Verify user's email address using verification token
   * @param token The verification token
   * @returns Observable of the verification response
   */
  verifyEmail(token: string) {
    return this.http.post(`${baseUrl}/verify-email`, { token });
  }

  /**
   * Request password reset for an email address
   * @param email The email address to reset password for
   * @returns Observable of the reset request response
   */
  forgotPassword(email: string) {
    return this.http.post(`${baseUrl}/forgot-password`, { email });
  }

  /**
   * Validate a password reset token
   * @param token The reset token to validate
   * @returns Observable of the validation response
   */
  validateResetToken(token: string) {
    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  }

  /**
   * Reset user's password using reset token
   * @param token The reset token
   * @param password The new password
   * @param confirmPassword Password confirmation
   * @returns Observable of the reset response
   */
  resetPassword(token: string, password: string, confirmPassword: string) {
    return this.http.post(`${baseUrl}/reset-password`, {
      token,
      password,
      confirmPassword,
    });
  }

  /**
   * Get all user accounts (admin only)
   * @returns Observable of account array
   */
  getAll() {
    return this.http.get<Account[]>(baseUrl);
  }

  /**
   * Get account by id
   * @param id The account id
   * @returns Observable of the account
   */
  getById(id: string) {
    return this.http.get<Account>(`${baseUrl}/${id}`);
  }

  /**
   * Update account details
   * @param id The account id to update
   * @param params The account parameters to update
   * @returns Observable of the updated account
   */
  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params).pipe(
      map((account: any) => {
        // Update current account if it was modified
        if (account.id === this.accountValue.id) {
          account = { ...this.accountValue, ...account };
          this.accountSubject.next(account);
        }
        return account;
      })
    );
  }

  /**
   * Delete an account
   * @param id The account id to delete
   * @returns Observable of the delete response
   */
  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`).pipe(
      finalize(() => {
        // Auto logout if the logged in account was deleted
        if (id === this.accountValue.id) {
          this.logout();
        }
      })
    );
  }

  private refreshTokenTimeout;

  /**
   * Start the refresh token timer
   * Automatically refreshes the JWT token before it expires
   */
  private startRefreshTokenTimer() {
    const jwtToken = JSON.parse(atob(this.accountValue.jwtToken.split(".")[1]));
    const expires = new Date(jwtToken.exp * 1000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => {
      this.refreshToken().subscribe();
    }, timeout);
  }

  /**
   * Stop the refresh token timer
   */
  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}