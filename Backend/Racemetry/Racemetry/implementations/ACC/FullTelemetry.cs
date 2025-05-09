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
        public string? CurrentTime;
        public string? LastTime;
        public string? BestTime;
        public string? Split;
        public int CompletedLaps;
    }
}
