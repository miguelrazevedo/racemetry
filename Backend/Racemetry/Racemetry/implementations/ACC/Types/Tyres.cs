namespace Racemetry.implementations.ACC.Types
{
    public readonly record struct Tyres<T>
    {
        public T FrontLeft { get; init; }
        public T FrontRight { get; init; }
        public T RearLeft { get; init; }
        public T RearRight { get; init; }
    }
}
