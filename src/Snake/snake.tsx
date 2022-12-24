import { DirectionType } from "./direction";
import { Point } from "./point";

interface SnakeType {
  direction: DirectionType;
  body: Point[];
}

class Snake {
  direction: DirectionType;
  body: Point[]; // Head: Last element

  constructor(direction: DirectionType, body: Point[]) {
      this.direction = direction;
      this.body = body;
  }
}

export { Snake };
export type { SnakeType };