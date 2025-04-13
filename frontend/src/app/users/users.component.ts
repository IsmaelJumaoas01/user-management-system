import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService } from '../_services';
import { Account, Role } from '../_models';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers';

@Component({
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.less']
})
export class UsersComponent implements OnInit {
    users: Account[] = [];
    loading = false;
    editForm!: FormGroup;
    selectedUser: Account | null = null;

    constructor(
        private accountService: AccountService,
        private alertService: AlertService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.loadUsers();
        this.initEditForm();
    }

    private loadUsers() {
        this.loading = true;
        this.accountService.getAll()
            .subscribe(users => {
                this.users = users;
                this.loading = false;
            });
    }

    private initEditForm() {
        this.editForm = this.formBuilder.group({
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            role: ['', Validators.required],
            password: ['', [Validators.minLength(6)]],
            confirmPassword: ['']
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    editUser(user: Account) {
        this.selectedUser = user;
        this.editForm.patchValue({
            title: user.title,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            password: '',
            confirmPassword: ''
        });
        // Show modal
        const modal = document.getElementById('editUserModal');
        if (modal) {
            modal.classList.add('show');
            modal.style.display = 'block';
        }
    }

    onEditSubmit() {
        if (this.editForm.invalid || !this.selectedUser) {
            return;
        }

        // Remove password fields if they're empty
        const formValue = { ...this.editForm.value };
        if (!formValue.password) {
            delete formValue.password;
            delete formValue.confirmPassword;
        }

        this.loading = true;
        this.accountService.update(this.selectedUser.id, formValue)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User updated successfully');
                    this.loadUsers();
                    this.closeModal();
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    deleteUser(user: Account) {
        if (confirm('Are you sure you want to delete this user?')) {
            this.loading = true;
            this.accountService.delete(user.id)
                .pipe(first())
                .subscribe({
                    next: () => {
                        this.alertService.success('User deleted successfully');
                        this.loadUsers();
                    },
                    error: error => {
                        this.alertService.error(error);
                        this.loading = false;
                    }
                });
        }
    }

    closeModal() {
        const modal = document.getElementById('editUserModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
        }
        this.selectedUser = null;
        this.editForm.reset();
    }
} 