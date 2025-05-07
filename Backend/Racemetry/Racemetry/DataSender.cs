using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Racemetry
{
    internal class DataSender
    {
        public Game Game { get; set; }
        public string? Data { get; set; }
    }

    public enum Game
    {
        ACC
    }
}
