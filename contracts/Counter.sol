// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter{
    uint count = 0;

    function increment() external{
        count++;
    }

    function decrement() external{
        count--;
    }

    function getCount() external view returns(uint){
        return count;
    }
}

