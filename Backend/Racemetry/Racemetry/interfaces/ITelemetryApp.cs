﻿namespace Racemetry.interfaces
{
    internal interface ITelemetryApp<T>
    {
        T GetFullTelemetry();
    }
}
