import { AfterContentInit, AfterViewInit, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
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
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { HandlerErrorService } from 'src/app/services/handler-error.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  imageProfile: string = '`D:\\Workspace\\Openclassroom\\Projet 7 - Créez un réseau social d\'entreprise\\Documents\\ImagesProfil\\Profil_2.jpg`';
  usersList: Array<{user: User, isAdmin: boolean}> = new Array();
  isAdmin: boolean = false;
  roles: Array<Role> = [];
  adminToggle: boolean = true;
  adminToggleText: string = 'admin';



  toggleValue: any;

  ToggleForm: FormGroup | any;

  // @Output()
  //   toggleChange: EventEmitter<void> | any;

    activate = new FormControl();

  // private _deleteSnackBarRef: MatSnackBarRef<SnackConfirmComponent>;

  constructor(private formBuilder: FormBuilder,
              private _userService: UserService,
              private router: Router,
              private matSnackBar: MatSnackBar,
              private _handler: HandlerErrorService) 
  {
    this.ToggleForm = new FormGroup({
      formControlAdmin: new FormControl()
    });
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

    //Recherche du tous les utilisateurs et de leurs rôles
    this._userService.getUsers().subscribe((datas) => {

      datas.forEach((user: User) => {
        user.roles.forEach(role => {
          if(role.name == 'admin') {
            this.usersList.push({user: user,isAdmin: true});
          } else {
            this.usersList.push({user: user, isAdmin: false});
          }
        })
      });
    });

    

    
    
  }

  ngOnInit(): void {

    

    


    // console.log(this.usersList);
    // let slides = document.getElementsByClassName('mat-slide-toggle');
    // console.log(slides);

    // for(let i = 0; i < slides.length; i++) {
    //   console.log('for');
    //   let slide = slides[i];
    //   console.log(slide);
    // }
    
  }

  ngAfterViewInit(): void {

    let slide = document.getElementById('isAdminToggle_2');
          console.log(slide);


  }

  BeforeUnloadEvent() {


  }

  

  isSliceChecked(event: MatSlideToggleChange, user: User) {
    
    var value = '';
    const id = user.id;

    if(event.checked) {
      value = 'admin';
    } else {
      value = 'user';
    }
    
    //nom du case pour le switch dans le backend
    const name = 'role'

    this._userService.updateDataUser({ id, name, value}).then(() => {
        console.log('mise à jour du role OK');
    })
    .catch(error => {
      console.log('mise à jour du role KO');
      this._handler.handleError({ error: { message: 'Un problème est survenue lors de la mise à jour du role' }, status: error, message: error });
      
    })
   
  } 

  deleteUser(event: Event, user: User) {

    //Supprime l'utilisateur sélectionné et affiche le snackbar pour information
    //de la suppression

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
              // const index = this.usersList.indexOf(user, 0);
              // if (index > -1) {
              //   this.usersList.splice(index, 1);
              // }
              
            }
              
        });

  }

  getRoleAdmin(user: User, slide: any) {

    console.log(slide);
    
    user.roles.forEach(role => {
      console.log('role', role);
      if(role.name == "admin") {
        slide.checked = true;
        // this.ToggleForm.get
        // console.log(true);
        // return true;
      } else {
        slide.checked = false;
      }
      // return false;
    });

    return false;

  }

}
