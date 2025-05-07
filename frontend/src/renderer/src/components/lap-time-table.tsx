'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@renderer/components/ui/table'

// Mock lap data
const lapData = [
  {
    lap: 1,
    time: '1:43.245',
    s1: '32.456',
    s2: '39.123',
    s3: '31.666',
    tires: 'Soft',
    fuel: '95.4',
    position: 5
  },
  {
    lap: 2,
    time: '1:42.789',
    s1: '32.123',
    s2: '38.999',
    s3: '31.667',
    tires: 'Soft',
    fuel: '93.1',
    position: 4
  },
  {
    lap: 3,
    time: '1:42.567',
    s1: '32.001',
    s2: '38.900',
    s3: '31.666',
    tires: 'Soft',
    fuel: '90.8',
    position: 4
  },
  {
    lap: 4,
    time: '1:42.345',
    s1: '31.999',
    s2: '38.780',
    s3: '31.566',
    tires: 'Soft',
    fuel: '88.5',
    position: 3
  },
  {
    lap: 5,
    time: '1:41.982',
    s1: '31.789',
    s2: '38.650',
    s3: '31.543',
    tires: 'Soft',
    fuel: '86.2',
    position: 3,
    best: true
  },
  {
    lap: 6,
    time: '1:42.123',
    s1: '31.890',
    s2: '38.700',
    s3: '31.533',
    tires: 'Soft',
    fuel: '83.9',
    position: 3
  },
  {
    lap: 7,
    time: '1:42.456',
    s1: '32.000',
    s2: '38.800',
    s3: '31.656',
    tires: 'Soft',
    fuel: '81.6',
    position: 3
  },
  {
    lap: 8,
    time: '1:42.789',
    s1: '32.100',
    s2: '38.900',
    s3: '31.789',
    tires: 'Soft',
    fuel: '79.3',
    position: 3
  }
]

export function LapTimeTable() {
  return (
    <div className="rounded-md border border-zinc-700">
      <Table>
        <TableHeader>
          <TableRow className="bg-zinc-800 hover:bg-zinc-800">
            <TableHead className="text-zinc-400">Lap</TableHead>
            <TableHead className="text-zinc-400">Time</TableHead>
            <TableHead className="text-zinc-400">S1</TableHead>
            <TableHead className="text-zinc-400">S2</TableHead>
            <TableHead className="text-zinc-400">S3</TableHead>
            <TableHead className="text-zinc-400">Tires</TableHead>
            <TableHead className="text-zinc-400">Fuel</TableHead>
            <TableHead className="text-zinc-400">Pos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lapData.map((lap) => (
            <TableRow key={lap.lap} className={lap.best ? 'bg-green-950/30' : ''}>
              <TableCell>{lap.lap}</TableCell>
              <TableCell className={lap.best ? 'font-bold text-green-500' : 'font-mono'}>
                {lap.time}
              </TableCell>
              <TableCell className="font-mono">{lap.s1}</TableCell>
              <TableCell className="font-mono">{lap.s2}</TableCell>
              <TableCell className="font-mono">{lap.s3}</TableCell>
              <TableCell>{lap.tires}</TableCell>
              <TableCell>{lap.fuel}L</TableCell>
              <TableCell>P{lap.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
