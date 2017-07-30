import {INgRedux} from 'ng-redux';
import {fetchContacts} from '../redux/modules/contacts';
import {IOnDestroy, IOnInit} from 'angular';

class ContactsComponentController implements IOnInit, IOnDestroy {
  static $inject = ['$ngRedux'];
  unsubscribe: Function;
  fetchContacts: Function;

  constructor(private $ngRedux: INgRedux) {
    this.unsubscribe = $ngRedux.connect(state => ({contacts: state.contacts}), {fetchContacts})(this);
  }

  $onInit(): void {
    this.fetchContacts();
  }

  $onDestroy(): void {
    this.unsubscribe();
  }
}

export const hello: angular.IComponentOptions = {
  template: `
    <md-content>
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
