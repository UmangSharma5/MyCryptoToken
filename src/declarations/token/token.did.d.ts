import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'payOut' : ActorMethod<[], string>,
  'returnSymbol' : ActorMethod<[], string>,
  'transfer' : ActorMethod<[Principal, bigint], string>,
}
