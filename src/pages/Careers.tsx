
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";

// Sample job openings
const jobOpenings = [
  {
    id: 1,
    title: "Production Supervisor",
    department: "Manufacturing",
    location: "Balasore, Odisha",
    type: "Full-time",
    description: "We are looking for an experienced Production Supervisor to oversee our food production operations."
  },
  {
    id: 2,
    title: "Quality Control Analyst",
    department: "Quality Assurance",
    location: "Balasore, Odisha",
    type: "Full-time",
    description: "Join our QA team to ensure our products meet the highest quality standards."
  },
  {
    id: 3,
    title: "Sales Executive",
    department: "Sales",
    location: "Balasore, Odisha",
    type: "Full-time",
    description: "Looking for energetic sales professionals to expand our market presence."
  }
];

const Careers = () => {
  return (
    <>
      <Helmet>
        <title>Careers - Sudevi Agro Foods</title>
        <meta name="description" content="Join Sudevi Agro Foods. Explore career opportunities and be part of our journey in bringing traditional flavors to modern tables." />
      </Helmet>
      
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Careers</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Join our team and be part of our mission to preserve and share authentic flavors.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Growth Opportunities</h3>
                <p className="text-gray-600">
                  We believe in nurturing talent and providing opportunities for professional growth and development.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Collaborative Environment</h3>
                <p className="text-gray-600">
                  Work in a collaborative environment where your ideas are valued and your contributions make an impact.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Work-Life Balance</h3>
                <p className="text-gray-600">
                  We understand the importance of balance and strive to create a positive and supportive workplace.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">Current Openings</h2>
            
            {jobOpenings.length > 0 ? (
              <div className="space-y-6">
                {jobOpenings.map((job) => (
                  <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.department}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <Button className="bg-sudevi-red hover:bg-sudevi-darkRed">
                      Apply Now
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-2">No Current Openings</h3>
                <p className="text-gray-600 mb-4">
                  We don't have any open positions right now, but we're always looking for talented individuals to join our team.
                </p>
                <Button className="bg-sudevi-red hover:bg-sudevi-darkRed">
                  Submit Your Resume
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-16 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-4">Can't find a suitable position?</h2>
            <p className="text-gray-600 mb-6">
              We're always looking for talented individuals to join our team. Send us your resume and we'll keep it on file for future opportunities.
            </p>
            <Button className="bg-sudevi-red hover:bg-sudevi-darkRed">
              Send Spontaneous Application
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Careers;
