using System.Runtime.InteropServices;
using Racemetry.implementations.ACC.Types;

namespace Racemetry.implementations.ACC
{
    [StructLayout(LayoutKind.Sequential, Pack = 4, CharSet = CharSet.Unicode)]
    [Serializable]
    public record Physics
    {
        public int PacketId;
        public float Throttle;
        public float Brake;
        public float Fuel;
        public int Gear;
        public int Rpm;
        public float SteerAngle;
        public float SpeedKmh;
        public Vec3 Velocity;
        public Vec3 AccG;
        public Tyres<float> WheelSlip;
        public Tyres<float> WheelLoad;
        public Tyres<float> WheelsPressure;
        public Tyres<float> WheelAngularSpeed;
        public Tyres<float> TyreWear;
        public Tyres<float> TyreDirtyLevel;
        public Tyres<float> TyreCoreTemperature;
        public Tyres<float> CamberRad;
        public Tyres<float> SuspensionTravel;
        public float Drs;
        public float Tc;
        public float Heading;
        public float Pitch;
        public float Roll;
        public float CgHeight;
        public Damage CarDamage;
        public int NumberOfTyresOut;
        public int PitLimiterOn;
        public float Abs;
        public float KersCharge;
        public float KersInput;
        public int AutoShifterOn;
        public RideHeight RideHeight;
        public float TurboBoost;
        public float Ballast;
        public float AirDensity;
        public float AirTemp;
        public float RoadTemp;
        public Vec3 LocalAngularVelocity;
        public float FinalFf;
        public float PerformanceMeter;
        public int EngineBrake;
        public int ErsRecoveryLevel;
        public int ErsPowerLevel;
        public int ErsHeatCharging;
        public int ErsIsCharging;
        public float KersCurrentKj;
        public int DrsAvailable;
        public int DrsEnabled;
        public Tyres<float> BrakeTemp;
        public float Clutch;
        public Tyres<float> TyreTempI;
        public Tyres<float> TyreTempM;
        public Tyres<float> TyreTempO;
        public int IsAiControlled;
        public Tyres<Vec3> TyreContactPoint;
        public Tyres<Vec3> TyreContactNormal;
        public Tyres<Vec3> TyreContactHeading;
        public float BrakeBias;
        public Vec3 LocalVelocity;
        public int P2PActivation;
        public int P2PStatus;
        public float CurrentMaxRpm;
        public Vec4 Mz;
        public Vec4 Fx;
        public Vec4 Fy;
        public Tyres<float> SlipRatio;
        public Tyres<float> SlipAngle;
        public int TcInAction;
        public int AbsInAction;
        public Tyres<float> SuspensionDamage;
        public Tyres<float> TyreTemp;
        public float WaterTemp;
        public Tyres<float> BrakePressure;
        public int FrontBrakeCompound;
        public int RearBrakeCompound;
        public Tyres<float> PadLife;
        public Tyres<float> DiscLife;
        public int IgnitionOn;
        public int StarterEngineOn;
        public int IsEngineRunning;
        public float KerbVibration;
        public float SlipVibrations;
        public float GVibrations;
        public float AbsVibrations;
    }
}