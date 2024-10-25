/* eslint-disable react/prop-types */
import { Badge } from "@/components/ui/badge";
import { Calendar, Compass, Users } from "lucide-react"
import { FaMoneyCheckDollar } from "react-icons/fa6";


function Info({ trip }) {
    return (
        <div>
            <img src="/travel.jpg" alt="Map" className="h-[360px] w-full object-cover rounded-md" />

            <div>
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {trip.userSelection?.destination}
                    </h2>
                </div>
                <div className="p-6 bg-transparent rounded-lg">
                    <div className="flex flex-wrap items-center gap-4">
                        <Badge variant="secondary" className="px-3 py-2 bg-accent/50 hover:bg-accent/60">
                            <Calendar className="w-4 h-4 mr-2 text-gray-900" />
                            <span className="text-sm font-medium text-gray-100">{trip.userSelection?.days} Days</span>
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-2 bg-accent/50 hover:bg-accent/60">
                            <Compass className="w-4 h-4 mr-2 text-gray-900" />
                            <span className="text-sm font-medium text-gray-100">{trip.userSelection?.tripType}</span>
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-2 bg-accent/50 hover:bg-accent/60">
                            <Users className="w-4 h-4 mr-2 text-gray-900" />
                            <span className="text-sm font-medium text-gray-100">{trip.userSelection?.size}</span>
                        </Badge>
                        <Badge variant="secondary" className="px-3 py-2 bg-accent/50 hover:bg-accent/60">
                            <FaMoneyCheckDollar className="w-4 h-4 mr-2 text-gray-900" />
                            <span className="text-sm font-medium text-gray-100">{trip.userSelection?.budget}</span>
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Info