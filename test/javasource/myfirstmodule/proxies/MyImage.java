// This file was generated by Mendix Modeler.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package myfirstmodule.proxies;

public class MyImage extends system.proxies.Image
{
	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "MyFirstModule.MyImage";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		IsAnnotated("IsAnnotated"),
		CMBImage("CMBImage"),
		PublicThumbnailPath("PublicThumbnailPath"),
		FileID("FileID"),
		Name("Name"),
		DeleteAfterDownload("DeleteAfterDownload"),
		Contents("Contents"),
		HasContents("HasContents"),
		Size("Size"),
		MyImage_ParentEntity("MyFirstModule.MyImage_ParentEntity");

		private java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public MyImage(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, "MyFirstModule.MyImage"));
	}

	protected MyImage(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject myImageMendixObject)
	{
		super(context, myImageMendixObject);
		if (!com.mendix.core.Core.isSubClassOf("MyFirstModule.MyImage", myImageMendixObject.getType()))
			throw new java.lang.IllegalArgumentException("The given object is not a MyFirstModule.MyImage");
	}

	/**
	 * @deprecated Use 'MyImage.load(IContext, IMendixIdentifier)' instead.
	 */
	@Deprecated
	public static myfirstmodule.proxies.MyImage initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		return myfirstmodule.proxies.MyImage.load(context, mendixIdentifier);
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 */
	public static myfirstmodule.proxies.MyImage initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new myfirstmodule.proxies.MyImage(context, mendixObject);
	}

	public static myfirstmodule.proxies.MyImage load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return myfirstmodule.proxies.MyImage.initialize(context, mendixObject);
	}

	public static java.util.List<myfirstmodule.proxies.MyImage> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		java.util.List<myfirstmodule.proxies.MyImage> result = new java.util.ArrayList<myfirstmodule.proxies.MyImage>();
		for (com.mendix.systemwideinterfaces.core.IMendixObject obj : com.mendix.core.Core.retrieveXPathQuery(context, "//MyFirstModule.MyImage" + xpathConstraint))
			result.add(myfirstmodule.proxies.MyImage.initialize(context, obj));
		return result;
	}

	/**
	 * @return value of IsAnnotated
	 */
	public final java.lang.Boolean getIsAnnotated()
	{
		return getIsAnnotated(getContext());
	}

	/**
	 * @param context
	 * @return value of IsAnnotated
	 */
	public final java.lang.Boolean getIsAnnotated(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.Boolean) getMendixObject().getValue(context, MemberNames.IsAnnotated.toString());
	}

	/**
	 * Set value of IsAnnotated
	 * @param isannotated
	 */
	public final void setIsAnnotated(java.lang.Boolean isannotated)
	{
		setIsAnnotated(getContext(), isannotated);
	}

	/**
	 * Set value of IsAnnotated
	 * @param context
	 * @param isannotated
	 */
	public final void setIsAnnotated(com.mendix.systemwideinterfaces.core.IContext context, java.lang.Boolean isannotated)
	{
		getMendixObject().setValue(context, MemberNames.IsAnnotated.toString(), isannotated);
	}

	/**
	 * Set value of CMBImage
	 * @param cmbimage
	 */
	public final myfirstmodule.proxies.CMBImage getCMBImage()
	{
		return getCMBImage(getContext());
	}

	/**
	 * @param context
	 * @return value of CMBImage
	 */
	public final myfirstmodule.proxies.CMBImage getCMBImage(com.mendix.systemwideinterfaces.core.IContext context)
	{
		Object obj = getMendixObject().getValue(context, MemberNames.CMBImage.toString());
		if (obj == null)
			return null;

		return myfirstmodule.proxies.CMBImage.valueOf((java.lang.String) obj);
	}

	/**
	 * Set value of CMBImage
	 * @param cmbimage
	 */
	public final void setCMBImage(myfirstmodule.proxies.CMBImage cmbimage)
	{
		setCMBImage(getContext(), cmbimage);
	}

	/**
	 * Set value of CMBImage
	 * @param context
	 * @param cmbimage
	 */
	public final void setCMBImage(com.mendix.systemwideinterfaces.core.IContext context, myfirstmodule.proxies.CMBImage cmbimage)
	{
		if (cmbimage != null)
			getMendixObject().setValue(context, MemberNames.CMBImage.toString(), cmbimage.toString());
		else
			getMendixObject().setValue(context, MemberNames.CMBImage.toString(), null);
	}

	/**
	 * @return value of MyImage_ParentEntity
	 */
	public final myfirstmodule.proxies.ParentEntity getMyImage_ParentEntity() throws com.mendix.core.CoreException
	{
		return getMyImage_ParentEntity(getContext());
	}

	/**
	 * @param context
	 * @return value of MyImage_ParentEntity
	 */
	public final myfirstmodule.proxies.ParentEntity getMyImage_ParentEntity(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		myfirstmodule.proxies.ParentEntity result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.MyImage_ParentEntity.toString());
		if (identifier != null)
			result = myfirstmodule.proxies.ParentEntity.load(context, identifier);
		return result;
	}

	/**
	 * Set value of MyImage_ParentEntity
	 * @param myimage_parententity
	 */
	public final void setMyImage_ParentEntity(myfirstmodule.proxies.ParentEntity myimage_parententity)
	{
		setMyImage_ParentEntity(getContext(), myimage_parententity);
	}

	/**
	 * Set value of MyImage_ParentEntity
	 * @param context
	 * @param myimage_parententity
	 */
	public final void setMyImage_ParentEntity(com.mendix.systemwideinterfaces.core.IContext context, myfirstmodule.proxies.ParentEntity myimage_parententity)
	{
		if (myimage_parententity == null)
			getMendixObject().setValue(context, MemberNames.MyImage_ParentEntity.toString(), null);
		else
			getMendixObject().setValue(context, MemberNames.MyImage_ParentEntity.toString(), myimage_parententity.getMendixObject().getId());
	}

	@Override
	public boolean equals(Object obj)
	{
		if (obj == this)
			return true;

		if (obj != null && getClass().equals(obj.getClass()))
		{
			final myfirstmodule.proxies.MyImage that = (myfirstmodule.proxies.MyImage) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

	/**
	 * @return String name of this class
	 */
	public static java.lang.String getType()
	{
		return "MyFirstModule.MyImage";
	}

	/**
	 * @return String GUID from this object, format: ID_0000000000
	 * @deprecated Use getMendixObject().getId().toLong() to get a unique identifier for this object.
	 */
	@Override
	@Deprecated
	public java.lang.String getGUID()
	{
		return "ID_" + getMendixObject().getId().toLong();
	}
}
