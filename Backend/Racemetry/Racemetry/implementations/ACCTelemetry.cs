using System.IO.MemoryMappedFiles;
using Racemetry.interfaces;

namespace Racemetry.implementations
{
    internal class ACCTelemetry : IDisposable, ITelemetryApp<SPageFilePhysics>
    {
        private const string PhysicsPath = "Local\\acpmf_physics";
        private readonly MemoryMappedFile _physicsMap;
        private MemoryMappedViewAccessor? _physicsAccessor;
        private SPageFilePhysics _physicsData;

        public ACCTelemetry()
        {
            if (!OperatingSystem.IsWindows())
            {
                throw new PlatformNotSupportedException("Memory-mapped files are only supported on Windows.");
            }
            _physicsData = new SPageFilePhysics();
            _physicsMap = MemoryMappedFile.OpenExisting(PhysicsPath);
        }

        public SPageFilePhysics GetTelemetry()
        {
            _physicsAccessor = _physicsMap.CreateViewAccessor();
            _physicsAccessor.Read(0, out _physicsData);
            return _physicsData;
        }

        public void Dispose()
        {
            _physicsMap.Dispose();
            _physicsAccessor?.Dispose();
            Console.WriteLine("Everything has been disposed");
            GC.SuppressFinalize(this);
        }

    }
}
