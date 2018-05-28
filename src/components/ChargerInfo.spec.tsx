import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import IChargerInfo from '../types/ChargerInfo';
import ChargerInfo from './ChargerInfo';

Enzyme.configure({ adapter: new Adapter() });

it('renders charger properties properly', () => {
  const info: IChargerInfo = {
    cellCount: 6,
    coreType: 'coretype',
    customerID: 1,
    hwVersion: 1.15,
    isEncrypted: false,
    languageID: 1,
    swVersion: 1,
    upgradeType: 1,
  };
  const component = Enzyme.shallow(<ChargerInfo info={info}/>);
  expect(component.find('.core-type').text()).toEqual('coretype');
  expect(component.find('.hw-version').text()).toEqual('1.15');
  expect(component.find('.sw-version').text()).toEqual('1.00');
  expect(component.find('.cell-count').text()).toEqual('6');
});