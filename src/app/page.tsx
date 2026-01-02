"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Calculator } from "lucide-react";

interface Course {
  id: string;
  name: string;
  gradePoints: string;
  credits: string;
}

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([
    { id: crypto.randomUUID(), name: "", gradePoints: "", credits: "" },
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: crypto.randomUUID(), name: "", gradePoints: "", credits: "" },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id ? { ...course, [field]: value } : course
      )
    );
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const gradePoints = parseFloat(course.gradePoints);
      const credits = parseFloat(course.credits);

      if (!isNaN(gradePoints) && !isNaN(credits) && credits > 0) {
        totalPoints += gradePoints * credits;
        totalCredits += credits;
      }
    });

    if (totalCredits === 0) return null;
    return (totalPoints / totalCredits).toFixed(2);
  };

  const gpa = calculateGPA();
  const totalCredits = courses.reduce((sum, course) => {
    const credits = parseFloat(course.credits);
    return sum + (isNaN(credits) ? 0 : credits);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 font-sans">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40" />
      
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-purple-500/20 p-4 backdrop-blur-sm">
              <Calculator className="h-10 w-10 text-purple-300" />
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
              GPA Calculator
            </h1>
            <p className="mt-3 text-lg text-purple-200/70">
              Calculate your semester GPA instantly
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="mb-6 grid grid-cols-12 gap-3 text-sm font-medium uppercase tracking-wider text-purple-300/80">
              <div className="col-span-5">Course Name</div>
              <div className="col-span-3 text-center">Grade Points</div>
              <div className="col-span-3 text-center">Credits</div>
              <div className="col-span-1" />
            </div>

            <div className="space-y-3">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="grid grid-cols-12 items-center gap-3"
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className="col-span-5">
                    <Input
                      type="text"
                      placeholder="e.g. Calculus"
                      value={course.name}
                      onChange={(e) =>
                        updateCourse(course.id, "name", e.target.value)
                      }
                      className="border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      placeholder="0-10"
                      value={course.gradePoints}
                      onChange={(e) =>
                        updateCourse(course.id, "gradePoints", e.target.value)
                      }
                      className="border-white/10 bg-white/5 text-center text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="1-6"
                      value={course.credits}
                      onChange={(e) =>
                        updateCourse(course.id, "credits", e.target.value)
                      }
                      className="border-white/10 bg-white/5 text-center text-white placeholder:text-white/30 focus:border-purple-400 focus:ring-purple-400/20"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeCourse(course.id)}
                      disabled={courses.length === 1}
                      className="rounded-lg p-2 text-white/40 transition-colors hover:bg-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={addCourse}
              variant="outline"
              className="mt-6 w-full border-dashed border-white/20 bg-transparent text-purple-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-600/30 to-pink-600/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider text-white/60">
                    Semester GPA
                  </p>
                  <p className="mt-1 font-serif text-5xl font-bold text-white">
                    {gpa ?? "—"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium uppercase tracking-wider text-white/60">
                    Total Credits
                  </p>
                  <p className="mt-1 font-serif text-3xl font-bold text-white/80">
                    {totalCredits}
                  </p>
                </div>
              </div>
              {gpa && (
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
                    style={{ width: `${(parseFloat(gpa) / 4) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-white/40">
            Grade points typically range from 0.0 to 4.0
          </p>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
