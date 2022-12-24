import { useState, useEffect } from "react";
import { Cell, CellType } from "./Cell";
import { DirectionType, Direction, directions } from "./direction";
import { randomNumber } from "./randomNumber";
import { Point } from "./point";
import { Snake, SnakeType } from "./snake";

interface BoardProps {
    height: number,
    width: number,
    delay: number,
    handleReset: () => void,
    round: number
}

function Board({ height, width, delay, handleReset, round }: BoardProps) {
    const randomPoint = () => new Point(randomNumber(0, width), randomNumber(0, height));

    const [grid, setGrid] = useState<CellType[][]>([[]]);
    const [snake, setSnake] = useState<SnakeType>(new Snake(directions[randomNumber(0, directions.length)], [randomPoint()]));
    const [food, setFood] = useState<Point>(randomPoint())
    const [foodCollected, setFoodCollected] = useState<number>(0);
    const [keyPressed, setKeyPressed] = useState<string>("");
    const [gameTick, setGameTick] = useState<number>(0);

    // Initialization
    useEffect(() => {
        // Keydown event for changing direction
        document.getElementsByTagName("body")[0].addEventListener("keydown", e => {
            setKeyPressed(e.key);
        });

        // Game Interval that updates Snake and GameTick
        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                let snake = new Snake(prevSnake.direction, prevSnake.body);
                snake.body.push(new Point(prevSnake.body[prevSnake.body.length - 1].x + prevSnake.direction.x, prevSnake.body[prevSnake.body.length - 1].y + prevSnake.direction.y));
                snake.body.splice(0, 1);
                return snake;
            });
            setGameTick(prevGameTick => prevGameTick + 1);
        }, delay);

        return () => clearInterval(gameInterval);
    }, [height, width, delay]);

    // Game Update
    useEffect(() => {
        // Check if Snake bumped in itself
        for (let i = 0; i < snake.body.length - 1; i++) {
            if (snake.body[i].x === snake.body[snake.body.length - 1].x && snake.body[i].y === snake.body[snake.body.length - 1].y) {
                handleReset();
            }
        }

        // Check if Snake is at border
        let _snake = new Snake(snake.direction, snake.body);

        if (snake.body[snake.body.length - 1].x > width - 1) {
            _snake.body[_snake.body.length - 1].x = 0;
        } else if (snake.body[snake.body.length - 1].x < 0) {
            _snake.body[_snake.body.length - 1].x = width - 1;
        }
        if (snake.body[snake.body.length - 1].y > height - 1) {
            _snake.body[_snake.body.length - 1].y = 0;
        } else if (snake.body[snake.body.length - 1].y < 0) {
            _snake.body[_snake.body.length - 1].y = height - 1;
        }

        // Check if food is collected
        if (food.x === snake.body[snake.body.length - 1].x && food.y === snake.body[snake.body.length - 1].y) {
            setFoodCollected(foodCollected + 1);
            setFood(randomPoint());

            _snake.body.unshift(_snake.body[0]);
        }

        // Blank grid
        let _grid = [];

        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(CellType.Blank);
            }
            _grid.push(row);
        }

        // Snake to grid
        for (const SnakePart of snake.body) {
            _grid[SnakePart.y][SnakePart.x] = CellType.Snake;
        }

        // Food to grid
        _grid[food.y][food.x] = CellType.Food;

        // Snake direction
        let direction: DirectionType = snake.direction;

        switch (keyPressed.toLowerCase()) {
            case "a":
            case "arrowleft":
                if (direction !== Direction.east) direction = Direction.west;
                break;
            case "d":
            case "arrowright":
                if (direction !== Direction.west) direction = Direction.east;
                break;
            case "w":
            case "arrowup":
                if (direction !== Direction.south) direction = Direction.north;
                break;
            case "s":
            case "arrowdown":
                if (direction !== Direction.north) direction = Direction.south;
                break;
        }
        _snake.direction = direction;

        // Set state
        setGrid(_grid);
        setSnake(_snake);
    }, [gameTick]);

    return (<div className="flex flex-col">
        {grid.map(row => (<div className="flex">
            {row.map(cell => <Cell type={cell} />)}
        </div>))}
        <div className="my-8">
            <p className="text-xl"><span className="font-bold">Round</span>: {round}</p>
            <p className="text-xl"><span className="font-bold">Food Collected</span>: {foodCollected}</p>
            <p className="text-xl"><span className="font-bold">Game tick</span>: {gameTick}</p>
            <p className="text-xl"><span className="font-bold">Direction X</span>: {snake.direction.x}</p>
            <p className="text-xl"><span className="font-bold">Direction Y</span>: {snake.direction.y}</p>
            <p className="text-xl"><span className="font-bold">Height</span>: {height} units</p>
            <p className="text-xl"><span className="font-bold">Width</span>: {width} units</p>
            <p className="text-xl"><span className="font-bold">Delay</span>: {delay} ms</p>
            <p className="text-xl"><span className="font-bold">Head</span>: Unit {snake.body[snake.body.length - 1].x}</p>
            <p className="text-xl"><span className="font-bold">Head</span>: Unit {snake.body[snake.body.length - 1].y}</p>
        </div>
    </div>);
}

export default Board;