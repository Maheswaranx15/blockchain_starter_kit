// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.22;

// Smart contract definition
contract CropSupplyChain {
    // Data structure representing an individual crop
    struct Crop {
        uint256 id;
        string name;
        address farmer;
        address distributor;
        address consumer;
        bool isHarvested;
        bool isDistributed;
        bool isConsumed;
    }

    // Mapping to store information about all crops
    mapping(uint256 => Crop) public crops;

    uint256 public cropCount;

    // Event to log the harvesting of a crop
    event Harvested(uint256 cropId, address indexed farmer);

    // Event to log the distribution of a crop
    event Distributed(uint256 cropId, address indexed distributor);

    // Event to log the consumption of a crop
    event Consumed(uint256 cropId, address indexed consumer);

    // Function to harvest a new crop
    function harvestCrop(string memory _name) public {
        // Increment cropCount to generate a unique ID
        cropCount++;
        // Create a new Crop instance and store it in the mapping
        crops[cropCount] = Crop(
            cropCount,
            _name,
            msg.sender, // Address of the farmer
            address(0), // Initial distributor address
            address(0), // Initial consumer address
            true,      // Set isHarvested to true
            false,     // Set isDistributed to false
            false      // Set isConsumed to false
        );
        // Emit Harvested event to log the action
        emit Harvested(cropCount, msg.sender);
    }

    // Function to distribute a harvested crop
    function distributeCrop(uint256 _cropId, address _distributor) public {
        // Retrieve the crop using the provided crop ID
        Crop storage crop = crops[_cropId];
        // Check if the crop is available for distribution
        require(crop.isHarvested && !crop.isDistributed, "Crop not available for distribution");
        // Set the distributor's address and update the distribution status
        crop.distributor = _distributor;
        crop.isDistributed = true;
        // Emit Distributed event to log the action
        emit Distributed(_cropId, _distributor);
    }

    // Function to consume a distributed crop
    function consumeCrop(uint256 _cropId, address _consumer) public {
        // Retrieve the crop using the provided crop ID
        Crop storage crop = crops[_cropId];
        // Check if the crop is available for consumption
        require(crop.isHarvested && crop.isDistributed && !crop.isConsumed, "Crop not available for consumption");
        // Set the consumer's address and update the consumption status
        crop.consumer = _consumer;
        crop.isConsumed = true;
        // Emit Consumed event to log the action
        emit Consumed(_cropId, _consumer);
    }
}