// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract Facebook {
    struct Post {
        string caption;
        string url;
        uint256 likes;
        address owner;
        address[] likedUsers;
    }

    mapping(uint256 => Post) public posts;
    mapping(address => mapping(uint256 => bool)) public likedUsers;
    mapping(uint256 => uint256) public likes;
    uint256 public postCount;

    event postCreation(string _caption, string _url);
    event postLiked(uint256 id, uint256 likes);

    function createPost(string memory _caption, string memory _url) public {
        postCount++;
        posts[postCount] = Post(
            _caption,
            _url,
            0,
            msg.sender,
            new address[](0)
        );

        emit postCreation(_caption, _url);
    }

    function likePost(uint256 _id) public {
        Post storage _post = posts[_id];
        require(
            likedUsers[msg.sender][_id] == false,
            "You have already liked this video"
        );
        // Increment likes in mapping
        likes[_id] = likes[_id] + 1;
        // Add the user to the likedUsers array
        _post.likedUsers.push(msg.sender);
        _post.likes++;

        //Set the user to true in the mapping
        likedUsers[msg.sender][_id] = true;
        posts[_id] = _post;
        emit postLiked(_id, _post.likes);
    }

    // Get all videos
    function getPost() public view returns (Post[] memory) {
        Post[] memory _posts = new Post[](postCount);
        for (uint256 i = 0; i < postCount; i++) {
            _posts[i] = posts[i + 1];
        }
        return _posts;
    }
}
