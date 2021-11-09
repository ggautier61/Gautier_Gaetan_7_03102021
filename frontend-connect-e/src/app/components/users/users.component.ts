import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { DialogPosition,
          MatDialog, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackConfirmComponent } from 'src/app/shared/snack-confirm/snack-confirm.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  imageProfile: string = '`D:\\Workspace\\Openclassroom\\Projet 7 - Créez un réseau social d\'entreprise\\Documents\\ImagesProfil\\Profil_2.jpg`';
  usersList: Array<User> = [];
  isAdmin: boolean = false;
  roles: Array<Role> = [];
  adminToggle: boolean = true;
  adminToggleText: string = 'admin';

  // ToggleForm: FormGroup | any;

  @Output()
    toggleChange: EventEmitter<void> | any;

    activate = new FormControl();

    onToggleChange(event: any) {
      console.log(this.activate.value);
    } 
  

  // private _deleteSnackBarRef: MatSnackBarRef<SnackConfirmComponent>;

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService,
              private router: Router,
              private matSnackBar: MatSnackBar) 
  {

    // this.ToggleForm = this.formBuilder.group({
    //   isAdminToggle: [false]
    // })
    
    this._userService.connectedUser$.subscribe(user => {
      user.roles.forEach(role => {

        if(role.name == 'admin') {
          this._userService.isAdmin$.next(true);
        } else {
          this._userService.isAdmin$.next(false);
        }
        
      });
    });

    this._userService.isAdmin$.subscribe(admin => {
      this.isAdmin = admin;
    });
  }

  ngOnInit(): void {

    

    //Recherche du tous les utilisateurs et de leurs rôles
    this._userService.getUsers().subscribe((datas) => {
      console.log('users', datas);
      this.usersList = datas;
    })
  }

  deleteUser(event: Event, user: User) {

    //Supprime l'utilisateur sélectionné et affiche le snackbar pour information
    //de la suppression
    console.log(user);

    //récupération de l'id par l'id du bouton delete()
    const target = event.target as HTMLElement;
        var id: string = ''

    if(target.id.includes('btnDelete')) {
      id = target.id.split('_')[1];
    } else if(target.parentElement?.id.includes('btnDelete')) {
      id = target.parentElement?.id.split('_')[1];
    };

  

    const matSnackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'center',
      // verticalPosition: ''
    };


    const snackBarRef = this.matSnackBar.openFromComponent(SnackConfirmComponent, matSnackBarConfig);
        snackBarRef.instance.snackBarRef = snackBarRef;
        snackBarRef.instance.message =
            `Supprimer l'utilisateur ${user.firstname} ${user.lastname} ?`;
        snackBarRef.onAction().subscribe(() => {
            const snackRes = snackBarRef.instance.response;
            if (snackRes === 'OK') {
              console.log('ok');
              this._userService.deleteUser(id).subscribe(response => {
                if(response) { 
                  matSnackBarConfig.duration = 3000;
                  this.matSnackBar.open(
                    `${user.firstname} ${user.lastname} a bien été supprimé(e) ainsi que toutes ses publications`,
                    'Fermer',
                    matSnackBarConfig 
                  );
                }
              }, err => {
                  this.matSnackBar.open(`Une erreur est survenue.`, 'Fermer', { duration: 6000 });
              });

              //Suppression de l'utilisateur de UsersList pour remettre à jour la view
              const index = this.usersList.indexOf(user, 0);
              if (index > -1) {
                this.usersList.splice(index, 1);
              }
              
            }
              
        });

  }

  onAdminToggle(event: any) {

    console.log('change');
    const target = event.target as HTMLElement;
    console.log(target);
  }

}
