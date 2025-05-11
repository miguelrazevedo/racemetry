using System.Text.Json;
using Racemetry.implementations.ACC;


using var acc = new ACCTelemetry();


var isRecording = false;
var dataList = new List<FullTelemetry>();
while (true)
{
    if (Console.KeyAvailable)
    {
        var key = Console.ReadKey(true);

        // Record
        if (key.Key == ConsoleKey.R)
        {
            Console.WriteLine("Recording has started");
            isRecording = true;
        }
        else if (key.Key == ConsoleKey.Q)
        {
            break;
        }
    }

    if (!isRecording)
    {
        continue;
    }

    var data = acc.GetFullTelemetry();

    dataList.Add(data);

    // 30Hz
    await Task.Delay(33);

}

if (dataList.Count < 1)
{
    Console.WriteLine("No data has been saved");
    return;
}


string jsonData = JsonSerializer.Serialize(dataList, new JsonSerializerOptions { WriteIndented = true });

File.WriteAllText("./telemetryData30Hz.json", jsonData);

Console.WriteLine($"An array with {dataList.Count} objects has been saved in telemetryDatacsharp.json file");