import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";


actor Token {

    Debug.print("hello");

    var owner: Principal = Principal.fromText("rwac5-o67j5-2q2g7-opd6y-adqjx-mg5qf-uv63p-zvzoq-ogsub-luu6d-eae");

    var totalSupply : Nat = 1000000000;
    var symbol : Text = "CHD";

    //HashMap is not stable we try to use array to transfer/retransfer

    stable var balanceEntries: [(Principal,Nat)] = [];

    var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    if(balances.size() < 1){
        balances.put(owner,totalSupply);
    };

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)){ 
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func returnSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
            let amount = 10000;
            let result = await transfer(msg.caller,amount);
            return result;
        } else{
            return "Already Claimed";
        }
    };

    //2vxsx-fae
    //rwac5-o67j5-2q2g7-opd6y-adqjx-mg5qf-uv63p-zvzoq-ogsub-luu6d-eae

    public shared(msg) func transfer(to: Principal , amount: Nat) : async Text {
         let fromBalance =await balanceOf(msg.caller);
         if(fromBalance >= amount){
            let newFromBalance: Nat = fromBalance - amount;
            balances.put(msg.caller,newFromBalance);

            let sendBalance = await balanceOf(to);
            let newSendBalance = sendBalance + amount;
            balances.put(to,newSendBalance);

            return "Success";
         }else{
            return "Insufficient Balance";
         }
    };   

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);

        if(balances.size() < 1){
            balances.put(owner,totalSupply);
        }
    }

}