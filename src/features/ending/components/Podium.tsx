import type { Player } from '@/types/Player'
import { Crown } from 'lucide-react'

interface IProps {
    first: Player
    second: Player
    third?: Player
}

function Podium({ first, second, third }: IProps) {
    return (
        <div className="flex justify-between h-48 gap-3 relative">
            <div className="flex-1 text-center flex flex-col mt-14 text-gray-400">
                <p>{second.name}</p>
                <p>{second.points}</p>
                <div className="bg-gray-300 border-t-gray-200 border-t-4 flex-1 w-full text-center rounded-t-lg text-2xl flex items-center justify-center">
                    <span>2</span>
                </div>
            </div>
            <div className="flex-1 text-center flex flex-col text-yellow-500">
                <div className="flex justify-center">
                    <Crown />
                </div>
                <p className="font-bold">{first.name}</p>
                <p>{first.points}</p>
                <div className="bg-yellow-500 text-black border-t-yellow-400 border-t-4 flex-1 w-full text-center rounded-t-lg text-3xl flex items-center justify-center">
                    <span>1</span>
                </div>
            </div>
            <div
                className={`text-amber-600 flex-1 text-center flex flex-col ${third ? 'mt-20' : 'mt-30'}`}
            >
                <p>{third?.name}</p>
                <p>{third?.points}</p>
                <div className="bg-amber-700 border-amber-600 border-t-4 flex-1 w-full text-center rounded-t-lg text-2xl flex items-center justify-center">
                    <span>3</span>
                </div>
            </div>
        </div>
    )
}

export default Podium
