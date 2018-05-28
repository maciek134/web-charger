/*
 * Copyright © 2018, Maciej Sopyło <me@klh.io>
 *
 * This file is part of web-charger.
 *
 * web-charger is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * web-charger is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with web-charger.  If not, see <http://www.gnu.org/licenses/>.
 */

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