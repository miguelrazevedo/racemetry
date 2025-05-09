using System.Runtime.InteropServices;
using Racemetry.implementations.ACC.Types;

namespace Racemetry.implementations.ACC
{
    public enum ACC_PENALTY_TYPE
    {
        ACC_None = 0,
        ACC_DriveThrough_Cutting = 1,
        ACC_StopAndGo_10_Cutting = 2,
        ACC_StopAndGo_20_Cutting = 3,
        ACC_StopAndGo_30_Cutting = 4,
        ACC_Disqualified_Cutting = 5,
        ACC_RemoveBestLaptime_Cutting = 6,
        ACC_DriveThrough_PitSpeeding = 7,
        ACC_StopAndGo_10_PitSpeeding = 8,
        ACC_StopAndGo_20_PitSpeeding = 9,
        ACC_StopAndGo_30_PitSpeeding = 10,
        ACC_Disqualified_PitSpeeding = 11,
        ACC_RemoveBestLaptime_PitSpeeding = 12,
        ACC_Disqualified_IgnoredMandatoryPit = 13,
        ACC_PostRaceTime = 14,
        ACC_Disqualified_Trolling = 15,
        ACC_Disqualified_PitEntry = 16,
        ACC_Disqualified_PitExit = 17,
        ACC_Disqualified_Wrongway = 18,
        ACC_DriveThrough_IgnoredDriverStint = 19,
        ACC_Disqualified_IgnoredDriverStint = 20,
        ACC_Disqualified_ExceededDriverStintLimit = 21
    }
    public enum ACC_FLAG_TYPE
    {
        ACC_NO_FLAG = 0,
        ACC_BLUE_FLAG = 1,
        ACC_YELLOW_FLAG = 2,
        ACC_BLACK_FLAG = 3,
        ACC_WHITE_FLAG = 4,
        ACC_CHECKERED_FLAG = 5,
        ACC_PENALTY_FLAG = 6,
        ACC_GREEN_FLAG = 7,
        ACC_ORANGE_FLAG = 8
    }

    public enum ACC_STATUS
    {
        ACC_OFF = 0,
        ACC_REPLAY = 1,
        ACC_LIVE = 2,
        ACC_PAUSE = 3
    }

    public enum ACC_SESSION_TYPE
    {
        ACC_UNKNOWN = -1,
        ACC_PRACTICE = 0,
        ACC_QUALIFY = 1,
        ACC_RACE = 2,
        ACC_HOTLAP = 3,
        ACC_TIME_ATTACK = 4,
        ACC_DRIFT = 5,
        ACC_DRAG = 6
    }

    public enum ACC_WHEELS_TYPE
    {
        ACC_FrontLeft = 0,
        ACC_FrontRight = 1,
        ACC_RearLeft = 2,
        ACC_RearRight = 3
    }

    public enum ACC_TRACK_GRIP_STATUS
    {
        ACC_GREEN = 0,
        ACC_FAST = 1,
        ACC_OPTIMUM = 2,
        ACC_GREASY = 3,
        ACC_DEMP = 4,
        ACC_WET = 5,
        ACC_FLOODED = 6
    }

    public enum ACC_RAIN_INTENSITY
    {
        ACC_NO_RAIN = 0,
        ACC_DRIZZLE = 1,
        ACC_LIGHT_RAIN = 2,
        ACC_MEDIUM_RAIN = 3,
        ACC_HEAVY_RAIN = 4,
        ACC_THUNDERSTORM = 5
    }

    [StructLayout(LayoutKind.Sequential, Pack = 4, CharSet = CharSet.Unicode)]
    [Serializable]
    public record Graphics
    {
        public int PacketId;
        public ACC_STATUS Status;
        public ACC_SESSION_TYPE Session;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 15)]
        public string? CurrentTime;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 15)]
        public string? LastTime;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 15)]
        public string? BestTime;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 15)]
        public string? Split;

        public int CompletedLaps;
        public int Position;
        public int ICurrentTime;
        public int ILastTime;
        public int IBestTime;
        public float SessionTimeLeft;
        public float DistanceTraveled;
        public int IsInPit;
        public int CurrentSectorIndex;
        public int LastSectorTime;
        public int NumberOfLaps;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 33)]
        public string? TyreCompound;

        public float ReplayTimeMultiplier;
        public float NormalizedCarPosition;
        public int ActiveCars;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 60)]
        public Vec3[]? CarCoordinates;

        [MarshalAs(UnmanagedType.ByValArray, SizeConst = 60)]
        public int[]? CarIDs;

        public int PlayerCarID;
        public float PenaltyTime;
        public ACC_FLAG_TYPE Flag;
        public ACC_PENALTY_TYPE Penalty;
        public int IdealLineOn;
        public int IsInPitLane;
        public float SurfaceGrip;
        public int MandatoryPitDone;
        public float WindSpeed;
        public float WindDirection;
        public int IsSetupMenuVisible;
        public int MainDisplayIndex;
        public int SecondaryDisplayIndex;
        public int Tc;
        public int TcCut;
        public int EngineMap;
        public int Abs;
        public float FuelXLap;
        public int RainLights;
        public int FlashingLights;
        public int LightsStage;
        public float ExhaustTemperature;
        public int WiperLV;
        public int DriverStintTotalTimeLeft;
        public int DriverStintTimeLeft;
        public int RainTyres;
        public int SessionIndex;
        public float UsedFuel;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 15)]
        public string? DeltaLapTime;

        public int IDeltaLapTime;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 15)]
        public string? EstimatedLapTime;

        public int IEstimatedLapTime;
        public int IsDeltaPositive;
        public int ISplit;
        public int IsValidLap;
        public float FuelEstimatedLaps;

        [MarshalAs(UnmanagedType.ByValTStr, SizeConst = 33)]
        public string? TrackStatus;

        public int MissingMandatoryPits;
        public float Clock;
        public int DirectionLightsLeft;
        public int DirectionLightsRight;

        public int GlobalYellow;
        public int GlobalYellow1;
        public int GlobalYellow2;
        public int GlobalYellow3;
        public int GlobalWhite;
        public int GlobalGreen;
        public int GlobalChequered;
        public int GlobalRed;
        public int MfdTyreSet;
        public float MfdFuelToAdd;
        public Tyres<float> MfdTyrePressure;
        public ACC_TRACK_GRIP_STATUS trackGripStatus;
        public ACC_RAIN_INTENSITY RainIntensity;
        public ACC_RAIN_INTENSITY RainIntensityIn10min;
        public ACC_RAIN_INTENSITY RainIntensityIn30min;
        public int CurrentTyreSet;
        public int StrategyTyreSet;
        public int GapAhead;
        public int GapBehind;
    }

}
