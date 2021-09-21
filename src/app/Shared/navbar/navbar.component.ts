import { Router } from '@angular/router';
import { AccountService } from './../../Services/account.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() searchEmitter = new EventEmitter<string>();

  searchString : string;

  constructor(private accountService: AccountService, private router: Router) { }
  
  searchSidebar = false;
  menuSidebar = false;

  items: MenuItem[] = [];

  activeIndex: number = 0;
  value: string;

  ngOnInit(): void {
    this.initializeItems();
  }

  isUserLoggedIn = this.accountService.userIsLogged$;

  initializeItems() {
    this.items = [
      {
        label: 'Navigate',
        items: [
          {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/'
          }
        ]
      },
      {
        label: 'Shop',
        visible: this.accountService.loggedIn,
        items: [
          {
            label: 'Cart',
            icon: 'pi pi-shopping-cart',
            routerLink: '/cart'
          },
          {
              label: 'Wish List',
              icon: 'pi pi-heart',
              routerLink: '/wishlist'
          },
          {
            label: 'Orders',
            icon: 'pi pi-briefcase',
            routerLink: '/order'
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
            visible: !this.accountService.loggedIn
          },
          {
            label: 'Register',
            icon: 'pi pi-user-plus',
            routerLink: '/account/register',
            visible: !this.accountService.loggedIn
          },
          {
            label: 'LogOut',
            icon: 'pi pi-power-off',
            command: (event: any) => {
              this.accountService.logout();
            },
            visible: this.accountService.loggedIn
          }
        ]
      }
    ];
  }

  search(searchString: string) {
    this.searchSidebar = false;
    this.searchEmitter.emit(searchString);
    this.searchString = '';
    this.router.navigateByUrl('/');
  }

}
