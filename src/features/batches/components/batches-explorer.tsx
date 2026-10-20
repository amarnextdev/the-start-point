"use client"

import Link from "next/link"
import { LayoutGrid, Table2 } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/shared/status-badge"

import type { Batch } from "../types"
import { BatchCard } from "./batch-card"

/** All batches with a Cards / Timetable switch (Courses page). */
export function BatchesExplorer({ batches, enquireHref }: { batches: Batch[]; enquireHref: string }) {
  return (
    <Tabs defaultValue="cards" className="gap-8">
      <TabsList aria-label="Choose view" className="self-start sm:self-end">
        <TabsTrigger value="cards">
          <LayoutGrid /> Cards
        </TabsTrigger>
        <TabsTrigger value="table">
          <Table2 /> Timetable
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cards" className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <div className="grid gap-x-5 gap-y-8 pt-3 md:grid-cols-2 lg:grid-cols-3">
          {batches.map((batch) => (
            <BatchCard
              key={batch.id}
              batch={batch}
              tone="cream"
              ctaLabel="Reserve a seat"
              ctaHref={`${enquireHref}?batch=${batch.id}#enquire`}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="table" className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
        <div className="overflow-hidden rounded-3xl border bg-card">
          <Table className="min-w-[880px]">
            <TableHeader className="bg-navy [&_th]:text-white/85">
              <TableRow className="hover:bg-transparent">
                <TableHead>Batch</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Starts</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Timing</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Enquire</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-bold">{b.name}</TableCell>
                  <TableCell>{b.level}</TableCell>
                  <TableCell>{b.startDate}</TableCell>
                  <TableCell>{b.days}</TableCell>
                  <TableCell>{b.timing}</TableCell>
                  <TableCell>{b.duration}</TableCell>
                  <TableCell>{b.location}</TableCell>
                  <TableCell>
                    <StatusBadge status={b.status} />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`${enquireHref}?batch=${b.id}#enquire`}
                      className="font-bold underline underline-offset-4 hover:text-clay"
                    >
                      Enquire
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  )
}
