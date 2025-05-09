import { db } from "@/config/Firebase"
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore"
import { useEffect, useCallback, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Info from "../components/Info"
import Hotels from "../components/Hotels"
import Daily from "../components/Daily"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronUp,
  Calendar,
  MapPin,
  Users,
  Wallet,
  Trash2,
  Ban,
  Share2,
  Copy,
  Facebook,
  Mail,
  CalendarDays,
} from "lucide-react"
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

function MyTrips() {
  const { tripID } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)

  const getTripInfo = useCallback(async () => {
    setLoading(true)
    try {
      const docRef = doc(db, "Trips", tripID)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setTrip(docSnap.data())
      } else {
        toast.error("Trip Not Found", {
          description: "The requested trip does not exist or has been deleted.",
        })
        navigate("/history")
      }
    } catch (error) {
      console.error("Error fetching trip:", error)
      toast.error("Error", {
        description: "Failed to load trip data. Please try again.",
      })
    }
    setLoading(false)
  }, [tripID, navigate])

  useEffect(() => {
    if (tripID) {
      getTripInfo()
    }
  }, [tripID, getTripInfo])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDeleteTrip = async () => {
    try {
      await deleteDoc(doc(db, "Trips", tripID))
      toast.success("Trip Deleted", {
        description: "Your trip has been permanently deleted.",
      })
      navigate("/history")
    } catch (error) {
      console.error("Error deleting trip:", error)
      toast.error("Error", {
        description: "Failed to delete trip. Please try again.",
      })
    }
  }

  const handleRestoreTrip = async () => {
    try {
      const tripRef = doc(db, "Trips", tripID);

      // Before restoring, we need to check if trip dates are in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset hours to compare dates only

      // Convert end date string to Date object for comparison
      const endDateParts = (trip.userSelection?.endDateSimple || '').split('-');
      let newStatus = "upcoming";

      if (endDateParts.length === 3) {
        const endDate = new Date(
          parseInt(endDateParts[0]),
          parseInt(endDateParts[1]) - 1, // Month is 0-indexed
          parseInt(endDateParts[2])
        );

        // If trip end date is in the past, mark as completed instead of upcoming
        if (endDate < today) {
          newStatus = "completed";
        }
      }

      await updateDoc(tripRef, { status: newStatus });

      // Update local state
      setTrip(prev => ({ ...prev, status: newStatus }));

      toast.success("Trip Restored", {
        description: `Your trip has been restored and marked as ${newStatus}.`,
      });
      setShowRestoreDialog(false);
    } catch (error) {
      console.error("Error restoring trip:", error);
      toast.error("Error", {
        description: "Failed to restore trip. Please try again.",
      });
    }
  };

  const handleCancelTrip = async () => {
    try {
      const tripRef = doc(db, "Trips", tripID);
      await updateDoc(tripRef, { status: "canceled" });

      // Update local state
      setTrip(prev => ({ ...prev, status: "canceled" }));

      toast.success("Trip Cancelled", {
        description: "Your trip has been cancelled. You can restore it later.",
      })
      setShowCancelDialog(false)
    } catch (error) {
      console.error("Error cancelling trip:", error)
      toast.error("Error", {
        description: "Failed to cancel trip. Please try again.",
      })
    }
  };

  const handleCopyLink = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast.success("Link Copied", {
      description: "Trip link copied to clipboard",
    })
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const title = `Check out my trip to ${trip?.userSelection?.destination || "this amazing place"}!`

    let shareUrl = ""

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this trip: ${url}`)}`
        break
      default:
        return
    }

    window.open(shareUrl, "_blank")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 rounded-full border-t-blue-500 border-b-blue-700 border-l-blue-600 border-r-blue-600 animate-spin"></div>
      </div>
    )
  }

  const userSelection = trip?.userSelection || {}

  return (
    <div className="relative min-h-screen mb-16 bg-white">
      {/* Hero Section with Image Background and Gradient Overlay */}
      <div className="relative h-[500px]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Info trip={trip} imageOnly={true} fullHeight={true} />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-indigo-900/30 mix-blend-overlay"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="mb-2 text-4xl font-semibold text-white md:text-5xl">
              {userSelection.destination || "Your Trip"}
            </h1>

            <p className="flex items-center justify-center gap-2 mt-2 text-lg text-white/90">
              <CalendarDays className="w-5 h-5 text-white/70" />
              {userSelection.startDate} → {userSelection.endDate}
            </p>

            {/* Trip Details Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {userSelection.days && (
                <Badge className="px-3 py-1 text-sm font-medium bg-blue-500/80 hover:bg-blue-600/80">
                  <Calendar className="w-4 h-4 mr-1" />
                  {userSelection.days} Days
                </Badge>
              )}
              {userSelection.tripType && (
                <Badge className="px-3 py-1 text-sm font-medium bg-purple-500/80 hover:bg-purple-600/80">
                  <MapPin className="w-4 h-4 mr-1" />
                  {userSelection.tripType}
                </Badge>
              )}
              {userSelection.size && (
                <Badge className="px-3 py-1 text-sm font-medium bg-green-500/80 hover:bg-green-600/80">
                  <Users className="w-4 h-4 mr-1" />
                  {userSelection.size}
                </Badge>
              )}
              {userSelection.budget && (
                <Badge className="px-3 py-1 text-sm font-medium bg-amber-500/80 hover:bg-amber-600/80">
                  <Wallet className="w-4 h-4 mr-1" />
                  {userSelection.budget}
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              {/* Share Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 text-white bg-blue-600 hover:bg-blue-700">
                    <Share2 className="w-4 h-4" />
                    Share Trip
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={handleCopyLink} className="gap-2 cursor-pointer">
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare("facebook")} className="gap-2 cursor-pointer">
                    <Facebook className="w-4 h-4" />
                    <span>Facebook</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare("twitter")} className="gap-2 cursor-pointer">
                    <TwitterLogoIcon className="w-4 h-4" />
                    <span>Twitter</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare("linkedin")} className="gap-2 cursor-pointer">
                    <LinkedInLogoIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare("email")} className="gap-2 cursor-pointer">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Conditional Button based on Trip Status */}
              {trip?.status === "canceled" ? (
                <Button
                  variant="outline"
                  className="gap-2 text-white bg-green-600 border-green-500 hover:bg-green-700"
                  onClick={() => setShowRestoreDialog(true)}
                >
                  <CalendarDays className="w-4 h-4" />
                  Restore Trip
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="gap-2 text-white bg-transparent border-white hover:bg-white/10"
                  onClick={() => setShowCancelDialog(true)}
                >
                  <Ban className="w-4 h-4" />
                  Cancel Trip
                </Button>
              )}

              {/* Delete Button */}
              <Button variant="destructive" className="gap-2" onClick={() => setShowDeleteDialog(true)}>
                <Trash2 className="w-4 h-4" />
                Delete Trip
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Basics */}
      <div className="max-w-5xl px-4 mx-auto mt-8">
        <Info trip={trip} basicsOnly={true} />
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-10 w-full px-4 py-2 mt-8 bg-white/80 backdrop-blur-md">
        <Tabs defaultValue="accommodation" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="accommodation">Accommodation & Dining</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          <TabsContent value="accommodation">
            <Hotels trip={trip} />
          </TabsContent>

          <TabsContent value="activities">
            <Daily trip={trip} showTransport={false} />
          </TabsContent>

          <TabsContent value="transport">
            <div className="py-6">
              <Daily trip={trip} showActivities={false} showTransport={true} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="secondary"
          size="icon"
          className="fixed z-50 p-2 text-white transition-all duration-300 bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700"
          onClick={scrollToTop}
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this trip?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your trip to {userSelection.destination}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTrip} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel this trip?</AlertDialogTitle>
            <AlertDialogDescription>
              You can reschedule this trip later. Your trip details will be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Trip</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelTrip}>Cancel Trip</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Restore Confirmation Dialog */}
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore this trip?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark your trip as active again based on the dates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Cancelled</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestoreTrip}>Restore Trip</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default MyTrips