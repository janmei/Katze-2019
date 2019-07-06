using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Communicator : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public string ChangeText(string headline, string subline, int milliseconds = default(int))
    {
        Debug.Log("Headline: " + headline + " - Subline: " + subline + " Countdown: " + milliseconds);
        return "Funktioniert!";
    }
}
