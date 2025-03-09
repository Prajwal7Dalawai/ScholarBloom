import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignUp() {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    universityName: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Signup as {userType === "student" ? "Student" : "University"}</h2>
          <div className="flex gap-2 mb-4">
            <Button variant={userType === "student" ? "default" : "outline"} onClick={() => setUserType("student")}>Student</Button>
            <Button variant={userType === "university" ? "default" : "outline"} onClick={() => setUserType("university")}>University</Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Name</Label>
              <Input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label>Email</Label>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label>Password</Label>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            {userType === "university" && (
              <div>
                <Label>University Name</Label>
                <Input type="text" name="universityName" value={formData.universityName} onChange={handleChange} required />
              </div>
            )}
            <Button type="submit" className="w-full">Signup</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
