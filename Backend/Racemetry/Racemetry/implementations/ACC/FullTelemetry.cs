namespace Racemetry.implementations.ACC
{
    internal record FullTelemetry
    {
        // Physics
        public int PacketId_physics { get; set; }
        public float Throttle { get; set; }
        public float Brake { get; set; }
        public int Gear { get; set; }
        public int Rpm { get; set; }
        public float SteerAngle { get; set; }
        public float SpeedKmh { get; set; }

        // Graphics
        public int PacketId_graphics { get; set; }
        public string? CurrentTime { get; set; }
        public string? LastTime { get; set; }
        public string? BestTime { get; set; }
        public string? Split { get; set; }
        public int CompletedLaps { get; set; }

        // Static Info
        public string? CarModel { get; set; }
        public string? Track { get; set; }

    }
}
