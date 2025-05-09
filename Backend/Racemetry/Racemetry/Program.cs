using System.Text.Json;
using Racemetry.implementations.ACC;

// TODO: Validate args.
// Get the game -> For now, let's assume it's ACC
using var acc = new ACCTelemetry();

//using var ws = new ClientWebSocket();
//await ws.ConnectAsync(new Uri("ws://localhost:5000"), CancellationToken.None);

//var buffer = new byte[1024];
//int lastPacket = 0;
//while (ws.State == WebSocketState.Open)
//{
//    var telemetryData = acc.GetTelemetry();
//    if (telemetryData.PacketId == lastPacket)
//    {
//        continue;
//    }

//    var jsonString = JsonSerializer.Serialize(telemetryData);
//    await ws.SendAsync(new ArraySegment<byte>(Encoding.UTF8.GetBytes(jsonString)),
//        WebSocketMessageType.Text,
//        true,
//        CancellationToken.None);

//    lastPacket = telemetryData.PacketId;
//}

var isRecording = false;
var dataList = new List<Physics>();
var lastPacket = 0;
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

    //var physics = acc.GetTelemetry();
    var graphics = acc.GetGraphics();

    //Console.WriteLine("Physics: ");
    //Console.WriteLine(JsonSerializer.Serialize(physics, new JsonSerializerOptions { WriteIndented = true }));

    Console.WriteLine("Graphics:");
    Console.WriteLine(JsonSerializer.Serialize(graphics, new JsonSerializerOptions { WriteIndented = true }));
    //if (physics.PacketId != lastPacket)
    //{
    //    dataList.Add(physics);
    //    lastPacket = physics.PacketId;
    //}

    await Task.Delay(33);

}

//if (dataList.Count < 1)
//{
//    Console.WriteLine("No data has been saved");
//    return;
//}


//string jsonData = JsonSerializer.Serialize(dataList, new JsonSerializerOptions { WriteIndented = true });

//File.WriteAllText("./telemetryDatacsharp30Hz.json", jsonData);

//Console.WriteLine($"An array with {dataList.Count} objects has been saved in telemetryDatacsharp.json file");