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

import IChargerInfo from './ChargerInfo';

export enum ChargerCommand {
  CHARGER_INFO = 0x57,
}

export class ChargerHelper {
  public static perpareCommand(cmd: ChargerCommand): Uint8Array {
    const packet = [ 0x0f, 0x03, cmd, 0x00 ];
    const checksum = ChargerHelper.calcChecksum(packet);
    return new Uint8Array(packet.concat([ checksum, 0xff, 0xff ]));
  }

  public static parseChargerInfo(packet: DataView): IChargerInfo {
    const coreType = ChargerHelper.readString(packet, 5, 6);
    let pos: number = 11;
    const upgradeType = packet.getUint8(pos++);
    const isEncrypted = packet.getUint8(pos++) > 0;
    const customerID = packet.getUint16(pos += 2, true);
    const languageID = packet.getUint8(pos++);
    const swVersion = (packet.getUint8(pos++) + packet.getUint8(pos++)) / 100.0;
    const hwVersion = packet.getUint8(pos);
    return {
      cellCount: coreType === '100069' ? 8 : 6,
      coreType,
      customerID,
      hwVersion,
      isEncrypted,
      languageID,
      swVersion,
      upgradeType,
    };
  }

  private static calcChecksum(packet: number[]): number {
    return packet.slice(2).reduce((prev, curr) => prev + curr, 0);
  }

  private static readString(packet: DataView, start: number, length: number): string {
    let ret = '';
    for (let i = start; i < start + length; i++) {
      ret += String.fromCharCode(packet.getUint8(i));
    }
    return ret;
  }
}
