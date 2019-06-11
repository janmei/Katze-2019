using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationController : MonoBehaviour
{

    // Store all the animation scripts in list
    public List<_Animation> animations = new List<_Animation>();

    public int currentAnimation = 0;
    public bool autoStart = true;
    public bool running = false;

    // Start is called before the first frame update
    void Start()
    {
        // Get all animiatons
        foreach(_Animation ani in GetComponents<_Animation>())
        {
            animations.Add(ani);
        }
        // Start set animation if autostart is enabled
        if (autoStart && animations.Count >= 1)
        {
            StartAnimation(currentAnimation);
        }
    }

    // Update is called once per frame
    void Update()
    {
        // Call render function of current animation if running
        if (running)
        {
            animations[currentAnimation].Render();
        }

        if (Input.GetKeyDown(KeyCode.RightArrow)){
            NextAnimation();
        }
    }

    //
    // Public animation control functions
    //

    // Set animation to another one
    public void SetAnimation(int to)
    {
        Debug.Log(to);
        StopAnimation(currentAnimation - 1);
        // TODO: insert delay or wait until animation has stopped
        StartAnimation(to);
    }

    // Starts next animation
    public void NextAnimation()
    {
        if(currentAnimation < animations.Count - 1)
        {
            SetAnimation(currentAnimation+1);
        } else
        {
            SetAnimation(0);
        }
    }

    // Starts previous animation
    public void PreviousAnimation()
    {
        if (currentAnimation > 0)
        {
            SetAnimation(currentAnimation--);
        }
        else
        {
            SetAnimation(animations.Count - 1);
        }
    }

    // Starts a specific animation
    private void StartAnimation(int index)
    {
        Debug.Log("Start Index: " + index);
        currentAnimation = index;
        animations[index].Run();
        running = true;
    }
    // Stops a specific animation
    private void StopAnimation(int index)
    {
        animations[index].Stop();
    }
}
