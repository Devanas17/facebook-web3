// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "hardhat/console.sol";

contract Facebook {
    struct Post {
        address owner;
        string content;
        uint timestamp;
        uint likes;
    }

    // Post[] public posts;

    mapping(uint256 => Post) public posts;
    uint256 public postCounter;

    event NewUser(address indexed owner, string name, uint age, string bio);
    event NewPost(address indexed owner, string content, uint timestamp);
    event PostLiked(address indexed owner, uint index);

    function createPost(string memory _content) public {
        postCounter++;
        posts[postCounter] = Post(msg.sender, _content, block.timestamp, 0);
        emit NewPost(msg.sender, _content, block.timestamp);
    }

    function likePost(uint _id) public {
        Post storage post = posts[_id];
        post.likes++;
        emit PostLiked(post.owner, _id);
    }
}
