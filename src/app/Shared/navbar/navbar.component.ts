import { Router } from '@angular/router';
import { AccountService } from './../../Services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter<string>();

  searchString : string;

  constructor(public accountService: AccountService, private router: Router,
     private messageService: MessageService) { }
  
  searchSidebar = false;
  menuSidebar = false;

  items: MenuItem[] = [];

  activeIndex: number = 0;
  value: string;

  ngOnInit(): void {
    this.initializeItems();
    this.loggedIn === true;
  }

  getUserStatus() : boolean {
    this.isUserLoggedIn.subscribe(
      res => {
        if (res !== null) {
          return res;
        } else {
          return this.loggedIn;
        }
      }
    )
    return this.loggedIn;
  }


  isUserLoggedIn = this.accountService.userLogged$;
  loggedIn  = this.accountService.loggedIn;

  initializeItems() {
    this.items = [
      {
        label: 'Navigate',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/',
            command: () => {
              this.hideSideMenu();
            }
          }
        ]
      },
      {
        label: 'Shop',
        items: [
          {
            label: 'Cart',
            routerLink: '/cart',
            icon: 'pi pi-shopping-cart',
            command: () => {
                this.hideSideMenu();
            }
          },
          {
              label: 'Wish List',
              icon: 'pi pi-heart',
              command: () => {
                this.messageService.add({severity: 'info', summary: 'This feature is not available at this moment!', detail: 'Do not worry! Will be added soon!', life: 5000});
              }
          },
          {
            label: 'Orders',
            icon: 'pi pi-briefcase',
            routerLink: '/order',
            command: () => {
              this.hideSideMenu();
            }
          }
        ]
      },
      {
        label: 'Account',
        items: [
          {
            label: 'Login',
            icon: 'pi pi-user',
            routerLink: '/account/login',
            command: () => {
              this.hideSideMenu();
            }
          },
          {
            label: 'Register',
            icon: 'pi pi-user-plus',
            routerLink: '/account/register',
            command: () => {
              this.hideSideMenu();
            }
          },
          {
            label: 'LogOut',
            icon: 'pi pi-power-off',
            command: (event: any) => {
                this.accountService.logout();
              this.hideSideMenu();
            },
          }
        ]
      }
    ];
  }

  showSideMenu() {
    this.menuSidebar = true;
  }

  hideSideMenu() {
    this.menuSidebar = false;
  }

  search(searchString: string) {
    this.searchSidebar = false;
    this.searchEmitter.emit(searchString);
    this.searchString = '';
    this.hideSideMenu();
    this.router.navigateByUrl('/');
  }

}
