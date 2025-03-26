export default function ScCard({ scholarship }) {
  return (
    <div className="bg-card dark:bg-card-foreground text-card-foreground dark:text-card p-4 rounded-lg shadow-lg border border-primary max-w-md mx-auto mt-8 relative">
      
      {/* University Image */}
      <img 
        src="https://openui.fly.dev/openui/400x200.svg?text=University" 
        alt="University Image" 
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{scholarship.name}</h2>
        <p className="text-sm text-secondary mb-2">Amount: {scholarship.amount}</p>
        
        {/* Status */}
        <p className="text-sm text-primary flex items-center mb-2">
          Status: 
          <img 
            alt="award-icon" 
            src="https://openui.fly.dev/openui/24x24.svg?text=🏆" 
            className="w-4 h-4 inline-block ml-2 bg-primary rounded-full"
          />
          {scholarship.status}
        </p>

        <p className="text-sm text-secondary mb-2">Internship: Software Engineer</p>
      </div>
    </div>
  );
}
