namespace Racemetry.implementations.ACC.Types
{
    public record struct Damage
    {
        public float Right { get; init; }
        public float Left { get; init; }
        public float Front { get; init; }
        public float Rear { get; init; }
        public float Center { get; init; }
    }
}
