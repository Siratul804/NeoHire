"use client";
import { format } from "date-fns";
import { Brain, Target, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dummyData = [
  { date: "Jan", score: 20 },
  { date: "Feb", score: 40 },
  { date: "Mar", score: 30 },
  { date: "Apr", score: 50 },
  { date: "May", score: 70 },
  { date: "Jun", score: 60 },
  { date: "Jul", score: 80 },
  { date: "Aug", score: 90 },
  { date: "Sep", score: 75 },
  { date: "Oct", score: 85 },
  { date: "Nov", score: 95 },
  { date: "Dec", score: 100 },
];

export default function Dashboard() {
  return (
    <div className="pt-20 md:pt-28 pb-10">
      <div className="flex items-center justify-between  mb-6">
        <h1 className="text-6xl font-bold gradient-title">
          Dashboard Overview
        </h1>
      </div>
      <div className="space-y-6">
        {/* stats card */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Interview taken
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">10</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resume Score
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">React.js Next.js</div>
            </CardContent>
          </Card>
        </div>
        {/* performance chart card */}
        <Card>
          <CardHeader>
            <CardTitle className="gradient-title text-3xl md:text-4xl">
              Performance Trend
            </CardTitle>
            <CardDescription>Your Interview scores over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload?.length) {
                        return (
                          <div className="bg-background border rounded-lg p-2 shadow-md">
                            <p className="text-sm font-medium">
                              Score: {payload[0].value}%
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {payload[0].payload.date}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
