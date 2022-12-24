type DirectionType = {[key: string]: number};

const Direction: {[key: string]: DirectionType}  = {
    north: {
        x: 0,
        y: -1
    },
    east: {
        x: 1,
        y: 0
    },
    south: {
        x: 0,
        y: 1
    },
    west: {
        x: -1,
        y: 0
    }
}

const directions = [Direction.north, Direction.south, Direction.west, Direction.east];

export {
  Direction,
  directions
};

export type { DirectionType };