import {INgRedux} from 'ng-redux';
import {fetchContacts, findContacts} from '../redux/modules/contacts';
import {IOnDestroy, IOnInit} from 'angular';
import {debounce} from 'lodash';

class ContactsComponentController implements IOnInit, IOnDestroy {
  static $inject = ['$ngRedux'];
  inputValue: string = '';
  unsubscribe: Function;
  fetchContacts: Function;
  findContacts: Function;
  findDebounce: Function;

  constructor(private $ngRedux: INgRedux) {
    this.unsubscribe = $ngRedux.connect(state => ({contacts: state.contacts}), {fetchContacts, findContacts})(this);
  }

  $onInit(): void {
    this.fetchContacts();

    this.findDebounce = debounce(() => {
      this.findContacts(this.inputValue);
    }, 500);
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  find(): void {
    this.findDebounce();
  }
}

export const hello: angular.IComponentOptions = {
  template: `
    <md-content>
      <md-toolbar>
        <div layout="row" layout-align="center center">
          <md-input-container md-no-float class="md-block">
            <input type="text" placeholder="search contacts ..." style="color: #fff" ng-change="$ctrl.find()" ng-model="$ctrl.inputValue">
          </md-input-container>
        </div>
      </md-toolbar>
      <md-list flex>
        <md-list-item immutable="$ctrl.contacts" class="md-3-line" ng-repeat="contact in $ctrl.contacts" ng-click="null">
          <img ng-src="{{contact.avatar}}" class="md-avatar" alt="{{concat.name}}" />
           <div class="md-list-item-text" layout="column">
            <h3>{{ contact.name }}</h3>
            <h4>{{ contact.email }}</h4>
            <p>{{ contact.phone }}</p>
           </div>
        </md-list-item>
      </md-list>
    </md-content>
  `,
  controller: ContactsComponentController
};
