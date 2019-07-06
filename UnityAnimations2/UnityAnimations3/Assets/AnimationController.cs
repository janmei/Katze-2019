using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AnimationController : MonoBehaviour
{
    public Animator transition;
    public Animator buildings;

    // Start is called before the first frame update
    void Start()
    {
        FadeOutBuildings();
    }

    // Update is called once per frame
    void Update()
    {
    }

    public void StartTransition()
    {
        transition.SetBool("fadeOut", true);
    }

    public void FadeOutBuildings()
    {
        buildings.SetBool("fadeOut", true);
    }
}
