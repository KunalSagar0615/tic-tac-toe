import React, { useState, useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ting from "../assets/ting.mp3";
import winAnimation from "../assets/excited.gif";
import gameOver from "../assets/gameover.mp3";


const TicTacToe = () => {

    const [arr, setArr] = useState([null, null, null, null, null, null, null, null, null])
    const [winner, setWinner] = useState(null)
    const [isXTurn, setIsXTurn] = useState(true)
    const [isDraw, setDraw] = useState(null)
    const audio = new Audio(ting);
    const gameover = new Audio(gameOver);
    const { player1Name, setPlayer1Name, player2Name, setPlayer2Name } = useContext(MyContext)
    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")
    const [gameDiv, setGameDiv] = useState(true);



    const handleClick = (index) => {
        if (arr[index]) return; // if array index already have value then we don't need to set value

        if (winner) return;//if any winner found then don't give chance to play

        const temArr = [...arr] //sprades array

        if (isXTurn) {
            temArr[index] = 'X'
        } else {
            temArr[index] = 'O'
        }

        audio.play()
        setArr(temArr);

        //to check winner
        // first check for (array has value or not) second and third check for (to check 3 values are same or not) 
        if (temArr[0] && temArr[0] == temArr[1] && temArr[1] == temArr[2] ||
            temArr[3] && temArr[3] == temArr[4] && temArr[4] == temArr[5] ||
            temArr[6] && temArr[6] == temArr[7] && temArr[7] == temArr[8] ||
            temArr[0] && temArr[0] == temArr[3] && temArr[3] == temArr[6] ||
            temArr[1] && temArr[1] == temArr[4] && temArr[4] == temArr[7] ||
            temArr[2] && temArr[2] == temArr[5] && temArr[5] == temArr[8] ||
            temArr[0] && temArr[0] == temArr[4] && temArr[4] == temArr[8] ||
            temArr[2] && temArr[2] == temArr[4] && temArr[4] == temArr[6]
        ) {
            setWinner(isXTurn ? player1Name : player2Name)
        }

        if (!temArr.includes(null) && !winner) {
            setDraw(true);
            return;
        }

        setIsXTurn(!isXTurn) // it toggels value X and O

    }

    //when we click on restart then this function evaluates and set all states null so we can play again
    const handleRestart = () => {
        setArr([null, null, null, null, null, null, null, null, null])
        setIsXTurn(true)
        setDraw(null)
        setWinner(null)
        setName1("");
        setName2("");
        setPlayer1Name("X");
        setPlayer2Name("O");
    }

    const handleSubmit = () => {
        if (name1.length === 0) {
            alert("Enter player 1 name firstly");
            return;
        }
        if (name2.length === 0) {
            alert("Enter player 2 name firstly");
            return;
        }
        setPlayer1Name(name1);
        setPlayer2Name(name2);
        setName1("");
        setName2("");

        setGameDiv(true);
    }



    useEffect(() => {
        if (isDraw) {
            gameover.play();
        }
    }, [isDraw]);


    return (
        <div className='p-5 h-screen w-screen bg-slate-900 text-white'>
            <h1 className='text-center my-7 text-6xl font-extrabold text-shadow-lg text-cyan-400'>Tic Tac Toe</h1>

            {
                gameDiv ? <>
                    <div className='flex justify-around'>
                        <div className='w-[450px] h-[450px] text-5xl font-bold grid grid-cols-3 gap-0.5'>
                            {
                                arr.map((ele, i) => <div className='w-[150px] h-[150px] flex items-center justify-center border border-white cursor-pointer'
                                    onClick={() => handleClick(i)} key={i}>
                                    <span className={ele === 'X' ? 'text-cyan-400' : 'text-pink-400'}>{ele}</span>
                                </div>)
                            }
                        </div>
                        <div className='w-[450px] h-[450px] flex justify-center items-center text-5xl'>
                            {
                                winner ? (
                                    <div className='flex justify-center flex-col'>
                                        <img src={winAnimation} alt="" />
                                        <h1 className="text-green-400 text-center font-medium ">winner is {winner}</h1>
                                    </div>
                                ) : isDraw ? (
                                    <h1 className="text-yellow-400">It's a Draw!</h1>
                                ) : (
                                    <h1 className="text-gray-30 font-bold">Turn of {isXTurn ? player1Name : player2Name}</h1>
                                )
                            }
                        </div>
                    </div> 
                    <div className='mt-5 flex justify-center gap-4'>
                <button type="button" className='rounded  border-cyan-400 bg-cyan-700 px-5 py-1 text-white transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400' onClick={() => setGameDiv(false)} >
                    Play using names
                </button>
                <button type="button" className='rounded  border-pink-400 bg-pink-700 px-5 py-1 text-white transition hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400' onClick={() => handleRestart()} >
                    Restart</button>
            </div>
                    </>: <div className='flex flex-col items-center h-screen w-screen'>
                        <input type="text" className='border border-cyan-400 bg-slate-800 text-white outline-none px-4 py-1 rounded w-[50vw] mt-4 placeholder-cyan-300 focus:ring-2 focus:ring-cyan-400'
                            placeholder='Enter player 1 Name' value={name1} onChange={(e) => setName1(e.target.value)} />
                        <input type="text" className='border border-pink-400 bg-slate-800 text-white outline-none px-4 py-1 rounded w-[50vw] mt-4 placeholder-pink-300 focus:ring-2 focus:ring-pink-400'
                            placeholder='Enter player 2 Name' value={name2} onChange={(e) => setName2(e.target.value)} />
                        <div className='flex gap-4 mt-4'>
                            <button type="button" className=' bg-cyan-700 px-5 py-1 text-white rounded transition hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400' onClick={() => handleSubmit()} >
                                Submit
                            </button>
                            <button type="button" className=' bg-gray-700 px-5 py-1 text-white rounded transition hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400' onClick={() => setGameDiv(true)} >
                                <MdOutlineKeyboardBackspace />
                            </button>
                        </div>
                    </div>
            }
            
        </div >
    )
}

export default TicTacToe