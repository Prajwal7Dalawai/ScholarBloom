  <input
    type="text"
    name="fullName"
    value={formData.fullName}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
    required
    placeholder="Enter your full name"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email
  </label>
  <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
    required
    placeholder="Enter your email"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Phone Number
  </label>
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
    required
    placeholder="Enter your phone number"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Cover Letter
  </label>
  <textarea
    name="coverLetter"
    value={formData.coverLetter}
    onChange={handleChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
    rows="6"
    required
    placeholder="Write your cover letter here"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Resume/CV
  </label>
  <input
    type="file"
    name="resume"
    onChange={handleFileChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
    required
    accept=".pdf,.doc,.docx"
  />
</div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Additional Documents
  </label>
  <input
    type="file"
    multiple
    onChange={handleAdditionalFilesChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
    accept=".pdf,.doc,.docx"
  />
</div> 