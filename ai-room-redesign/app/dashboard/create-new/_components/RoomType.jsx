import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function RoomType({selectedRoomType}) {
    return (
        <div>
            <label className='text-slate-400'>Select Room Type *</label>
            <Select onValueChange={(value)=>selectedRoomType(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Living Room">Living Room</SelectItem>
                    <SelectItem value="BedRoom">BedRoom</SelectItem>
                    <SelectItem value="Kitchen">Kitchen</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="BathRoom">BathRoom</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}

export default RoomType
