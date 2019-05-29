using System.Collections;
using System.Collections.Generic;
using UnityEngine;

// Animation class that has all the required methods for every animation
// These functions should all be public, so they can get called from AnimationController

public class _Animation : MonoBehaviour
{

    // Grid
    public GridGenerator gridGenerator;
    public List<GameObject> grid = new List<GameObject>();
    // State
    public bool isRunning = false;

    // Start function for the animation
    public void Run()
    {
        isRunning = true;
    }

    // Update function for the animation    
    public void Render()
    {

    }

    // Stop function for the animation
    public void Stop()
    {

    }

}
