namespace Racemetry
{
    internal struct SPageFilePhysics
    {
        public int PacketId { get; set; }
        public float Gas { get; set; }
        public float Brake { get; set; }
        public float Fuel { get; set; }
        public int Gear { get; set; }
        public int RPMs { get; set; }
        public float SteerAngle { get; set; }
        public float SpeedKmh { get; set; }
    }
}