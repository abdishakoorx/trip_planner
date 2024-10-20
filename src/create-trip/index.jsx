import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"


function CreateTrip() {
  return (
    <div>
      {/* header */}
      <h1>Plan Your Dream Trip</h1>
      <h2>Tell us about your ideal vacation and we&apos;ll help you plan it!</h2>
      {/* form */}
      <form>
        {/* 2 inputs */}
        <div>
          <Label htmlFor="destination">Destination</Label>
          <input id="destination" type="text" placeholder="City, Country" />
        </div>
        <div>
          <Label htmlFor="days" >How many Days</Label>
          <input id="days" type="number" placeholder="1" />
        </div>

        {/* 3 radio buttons */}
        <div>
          <Label htmlFor="tripType">Trip Type</Label>
          <div>
            {/* radio button 1  - cultural */}
          </div>
          <div>
            {/* radio button 2  - adventure */}
          </div>
          <div>
            {/* radio button 3  - relaxation */}
          </div>
        </div>
        <div>
          <Label htmlFor="tripType">Budget</Label>
          <div>
            {/* radio button 1  - low */}
          </div>
          <div>
            {/* radio button 2  - medium */}
          </div>
          <div>
            {/* radio button 3  - high */}
          </div>
        </div>
        <div>
          <Label htmlFor="tripType">Size</Label>
          <div>
            {/* radio button 1  - personal */}
          </div>
          <div>
            {/* radio button 2  - family */}
          </div>
          <div>
            {/* radio button 3  - team */}
          </div>
        </div>
        
        <Button>Submit</Button>
      </form>
    </div>
  )
}

export default CreateTrip