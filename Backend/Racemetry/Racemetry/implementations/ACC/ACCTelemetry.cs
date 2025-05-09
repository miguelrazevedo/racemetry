using System.IO.MemoryMappedFiles;
using System.Runtime.InteropServices;
using Racemetry.interfaces;

namespace Racemetry.implementations.ACC
{
    internal class ACCTelemetry : IDisposable, ITelemetryApp
    {
        private const string PhysicsPath = "Local\\acpmf_physics";
        private const string GraphicsPath = "Local\\acpmf_graphics";

        private readonly MemoryMappedFile _physicsMap;
        private Physics _physicsData;

        private readonly MemoryMappedFile _graphicsMap;
        private Graphics _graphicsData;

        public ACCTelemetry()
        {
            if (!OperatingSystem.IsWindows())
            {
                throw new PlatformNotSupportedException("Memory-mapped files are only supported on Windows.");
            }
            _physicsMap = MemoryMappedFile.CreateOrOpen(PhysicsPath, Marshal.SizeOf<Physics>());
            _graphicsMap = MemoryMappedFile.CreateOrOpen(GraphicsPath, Marshal.SizeOf<Graphics>());
        }

        private void UpdatePhysics()
        {
            _physicsData = ReadMapFile<Physics>(_graphicsMap);
        }
        private void UpdateGraphics()
        {
            _graphicsData = ReadMapFile<Graphics>(_graphicsMap);
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
        public string GetTelemetryAsJSONString()
        {
            UpdatePhysics();
            UpdateGraphics();

            return "";
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
