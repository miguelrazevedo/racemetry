using System.IO.MemoryMappedFiles;
using System.Runtime.InteropServices;
using Racemetry.interfaces;

namespace Racemetry.implementations.ACC
{
    internal class ACCTelemetry : IDisposable, ITelemetryApp<FullTelemetry>
    {
        private const string PhysicsPath = "Local\\acpmf_physics";
        private const string GraphicsPath = "Local\\acpmf_graphics";
        private const string StaticInfoPath = "Local\\acpmf_static";

        private readonly MemoryMappedFile _physicsMap;
        private Physics _physicsData;

        private readonly MemoryMappedFile _graphicsMap;
        private Graphics _graphicsData;

        private readonly MemoryMappedFile _infoMap;
        private StaticInfo _infoData;

        public ACCTelemetry()
        {
            if (!OperatingSystem.IsWindows())
            {
                throw new PlatformNotSupportedException("Memory-mapped files are only supported on Windows.");
            }
            _physicsMap = MemoryMappedFile.CreateOrOpen(PhysicsPath, Marshal.SizeOf<Physics>());
            _graphicsMap = MemoryMappedFile.CreateOrOpen(GraphicsPath, Marshal.SizeOf<Graphics>());
            _infoMap = MemoryMappedFile.CreateOrOpen(StaticInfoPath, Marshal.SizeOf<StaticInfo>());
        }

        private void UpdatePhysics()
        {
            _physicsData = ReadMapFile<Physics>(_physicsMap) ?? new Physics();
        }
        private void UpdateGraphics()
        {
            _graphicsData = ReadMapFile<Graphics>(_graphicsMap) ?? new Graphics();
        }
        private void UpdateStaticInfo()
        {
            _infoData = ReadMapFile<StaticInfo>(_infoMap) ?? new StaticInfo();
        }

        private static T? ReadMapFile<T>(MemoryMappedFile file)
        {
            using var stream = file.CreateViewStream();
            using var reader = new BinaryReader(stream);

            var bytes = reader.ReadBytes(Marshal.SizeOf<T>());
            var handle = GCHandle.Alloc(bytes, GCHandleType.Pinned);
            var data = Marshal.PtrToStructure<T>(handle.AddrOfPinnedObject());
            handle.Free();

            return data;
        }


        /*
         * 
         * Interface Methods
         * 
         */
        public FullTelemetry GetFullTelemetry()
        {
            UpdatePhysics();
            UpdateGraphics();
            UpdateStaticInfo();

            var data = new FullTelemetry
            {
                PacketId_physics = _physicsData.PacketId,
                Throttle = _physicsData.Throttle,
                Brake = _physicsData.Brake,
                Gear = _physicsData.Gear - 1,
                Rpm = _physicsData.Rpm,
                SteerAngle = _physicsData.SteerAngle,
                SpeedKmh = _physicsData.SpeedKmh,

                PacketId_graphics = _graphicsData.PacketId,
                CurrentTime = _graphicsData.CurrentTime,
                LastTime = _graphicsData.LastTime,
                BestTime = _graphicsData.BestTime,
                Split = _graphicsData.Split,
                CompletedLaps = _graphicsData.CompletedLaps,

                CarModel = _infoData.CarModel,
                Track = _infoData.Track

            };

            return data;
        }
        public void Dispose()
        {
            _physicsMap.Dispose();
            _graphicsMap.Dispose();

            Console.WriteLine("Everything has been disposed");
            GC.SuppressFinalize(this);
        }

    }
}
