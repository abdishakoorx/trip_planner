import { Clock } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 gap-8">
      <div>
        <h2 className="mb-6 text-3xl font-semibold text-gray-900">Contact Information</h2>
        <p className="mb-8 text-gray-600">
          Our dedicated team is ready to assist you with any questions or concerns you may have about your travel plans.
          Feel free to reach out through any of the channels below.
        </p>

        <div className="space-y-6">

          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full text-amber-600 bg-amber-100">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
              <p className="text-gray-600">Monday - Friday:</p>
              <p className="font-medium text-gray-900">8:00 AM - 5:00 PM (EAT)</p>
              <p className="mt-2 text-gray-600">Saturday - Sunday:</p>
              <p className="font-medium text-gray-900">10:00 AM - 3:00 PM (EAT)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
